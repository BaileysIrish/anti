import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const action = process.argv[2];
const allowedActions = new Set(["build", "preview", "deploy", "upload"]);

if (!allowedActions.has(action)) {
  console.error(
    `Unsupported action "${action}". Use one of: build, preview, deploy, upload.`,
  );
  process.exit(1);
}

const sequenceByAction = {
  build: ["build"],
  preview: ["build", "preview"],
  deploy: ["build", "deploy"],
  upload: ["build", "upload"],
};

const commandSequence = sequenceByAction[action];

function runNative(sequence) {
  const pnpmBinary = process.platform === "win32" ? "pnpm" : "pnpm";
  const useShell = process.platform === "win32";

  if (process.platform === "win32") {
    applyOpenNextWindowsSymlinkFallback();
  }

  for (const step of sequence) {
    const result = spawnSync(
      pnpmBinary,
      ["exec", "opennextjs-cloudflare", step],
      { stdio: "inherit", shell: useShell },
    );

    if (result.status !== 0) {
      return result.status ?? 1;
    }
  }

  return 0;
}

function applyOpenNextWindowsSymlinkFallback() {
  const pnpmDir = path.join(process.cwd(), "node_modules", ".pnpm");
  let packageDirName = null;

  try {
    const directories = readdirSync(pnpmDir, { withFileTypes: true });
    const match = directories.find(
      (entry) => entry.isDirectory() && entry.name.startsWith("@opennextjs+aws@"),
    );
    packageDirName = match?.name ?? null;
  } catch {
    return;
  }

  if (!packageDirName) {
    return;
  }

  const copyTracedFilesPath = path.join(
    pnpmDir,
    packageDirName,
    "node_modules",
    "@opennextjs",
    "aws",
    "dist",
    "build",
    "copyTracedFiles.js",
  );

  let source = "";
  try {
    source = readFileSync(copyTracedFilesPath, "utf8");
  } catch {
    return;
  }

  if (source.includes("OPENNEXT_WINDOWS_FALLBACK_PATCH")) {
    return;
  }

  const originalBlock = `        if (symlink) {
            try {
                symlinkSync(symlink, to);
            }
            catch (e) {
                if (e.code !== "EEXIST") {
                    throw e;
                }
            }
        }
        else {
`;

  const patchedBlock = `        if (symlink) {
            try {
                symlinkSync(symlink, to);
            }
            catch (e) {
                if (e.code === "EEXIST") {
                    return;
                }
                // OPENNEXT_WINDOWS_FALLBACK_PATCH
                if (process.platform === "win32" && e.code === "EPERM") {
                    try {
                        if (statSync(from).isDirectory()) {
                            cpSync(from, to, { recursive: true });
                        }
                        else {
                            copyFileSync(from, to);
                        }
                    }
                    catch (copyError) {
                        logger.debug("Error copying file after symlink fallback:", copyError);
                        erroredFiles.push(to);
                    }
                    return;
                }
                throw e;
            }
        }
        else {
`;

  if (!source.includes(originalBlock)) {
    return;
  }

  const patched = source.replace(originalBlock, patchedBlock);
  writeFileSync(copyTracedFilesPath, patched, "utf8");
}

function toWslPath(winPath) {
  const match = /^([A-Za-z]):\\(.*)$/.exec(winPath);
  if (!match) {
    return null;
  }

  const drive = match[1].toLowerCase();
  const rest = match[2].replace(/\\/g, "/").replace(/'/g, "'\\''");
  return `/mnt/${drive}/${rest}`;
}

function runWithWsl(sequence) {
  const wslCwd = toWslPath(process.cwd());
  if (!wslCwd) {
    return null;
  }

  const commands = sequence
    .map((step) => `pnpm exec opennextjs-cloudflare ${step}`)
    .join(" && ");
  const shellCommand = `cd '${wslCwd}' && ${commands}`;

  const result = spawnSync("wsl.exe", ["-e", "bash", "-lc", shellCommand], {
    stdio: "inherit",
  });

  if (typeof result.status === "number") {
    return result.status;
  }

  return null;
}

if (process.platform === "win32" && process.env.OPENNEXT_WINDOWS_NATIVE !== "1") {
  const wslStatus = runWithWsl(commandSequence);

  if (wslStatus === 0) {
    process.exit(0);
  }

  if (wslStatus !== null) {
    console.warn(
      "WSL build failed; falling back to native Windows execution. " +
        "Set OPENNEXT_WINDOWS_NATIVE=1 to skip WSL fallback.",
    );
  } else {
    console.warn(
      "WSL path conversion failed; falling back to native Windows execution. " +
        "Set OPENNEXT_WINDOWS_NATIVE=1 to skip WSL fallback.",
    );
  }
}

const nativeStatus = runNative(commandSequence);
process.exit(nativeStatus);
