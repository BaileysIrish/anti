export interface RealEstateApartment {
    name: string;
    address: string;
    area: string;
    floor: string;
    price: string;
    date: string;
}

export interface RealEstateRegionData {
    region: string;
    apartments: RealEstateApartment[];
}

export type RealEstateSampleData = Record<string, RealEstateRegionData>;

// 예시 데이터: UI 동작 및 검색 흐름 확인용 샘플
export const realEstateSampleData: RealEstateSampleData = {
    "seoul-gangnam": {
        region: "서울 강남구",
        apartments: [
            { name: "래미안 퍼스티지", address: "대치동 316", area: "84.99㎡", floor: "15층", price: "28.5억", date: "2026.01.22" },
            { name: "대치아이파크", address: "대치동 1016", area: "59.99㎡", floor: "8층", price: "22.3억", date: "2026.01.12" },
        ],
    },
    "seoul-seocho": {
        region: "서울 서초구",
        apartments: [
            { name: "래미안 원베일리", address: "반포동 18-2", area: "84.97㎡", floor: "28층", price: "42.0억", date: "2026.01.25" },
            { name: "반포자이", address: "반포동 19", area: "84.94㎡", floor: "15층", price: "38.5억", date: "2026.01.22" },
        ],
    },
    "seoul-songpa": {
        region: "서울 송파구",
        apartments: [
            { name: "잠실주공5단지", address: "잠실동 40", area: "82.00㎡", floor: "12층", price: "45.75억", date: "2026.01.21" },
            { name: "올림픽파크 포레온", address: "둔촌동 481", area: "84.99㎡", floor: "42층", price: "20.5억", date: "2026.01.15" },
        ],
    },
    "seoul-yangcheon": {
        region: "서울 양천구",
        apartments: [
            { name: "신시가지7단지", address: "목동 917", area: "53.00㎡", floor: "8층", price: "24.0억", date: "2026.01.18" },
            { name: "목동센트럴아이파크위브", address: "목동 423", area: "84.97㎡", floor: "15층", price: "18.5억", date: "2026.01.15" },
        ],
    },
    "seoul-mapo": {
        region: "서울 마포구",
        apartments: [
            { name: "마포래미안푸르지오", address: "아현동 777", area: "84.99㎡", floor: "20층", price: "17.5억", date: "2026.01.22" },
            { name: "마포 프레스티지자이", address: "도화동 555", area: "59.98㎡", floor: "15층", price: "12.8억", date: "2026.01.18" },
        ],
    },
    "seoul-yongsan": {
        region: "서울 용산구",
        apartments: [
            { name: "한남더힐", address: "한남동 810", area: "244.54㎡", floor: "3층", price: "85.0억", date: "2026.01.22" },
            { name: "용산센트럴파크해링턴스퀘어", address: "용산동 200", area: "84.99㎡", floor: "35층", price: "22.8억", date: "2026.01.10" },
        ],
    },
    "gyeonggi-seongnam": {
        region: "경기 성남시",
        apartments: [
            { name: "판교 더샵 퍼스트파크", address: "백현동 532", area: "84.99㎡", floor: "25층", price: "18.5억", date: "2026.01.23" },
            { name: "분당 파크뷰", address: "정자동 15", area: "114.97㎡", floor: "18층", price: "16.8억", date: "2026.01.20" },
        ],
    },
    "gyeonggi-suwon": {
        region: "경기 수원시",
        apartments: [
            { name: "광교 자연앤자이", address: "이의동 1272", area: "84.99㎡", floor: "22층", price: "12.8억", date: "2026.01.22" },
            { name: "영통 아이파크", address: "영통동 992", area: "84.97㎡", floor: "15층", price: "8.5억", date: "2026.01.15" },
        ],
    },
    "gyeonggi-guri": {
        region: "경기 구리시",
        apartments: [
            { name: "구리 갈매역 자이", address: "갈매동 555", area: "84.99㎡", floor: "22층", price: "8.5억", date: "2026.01.18" },
            { name: "롯데캐슬 더퍼스티지", address: "수택동 358", area: "84.97㎡", floor: "18층", price: "7.2억", date: "2026.01.15" },
        ],
    },
    "gyeonggi-gwangmyeong": {
        region: "경기 광명시",
        apartments: [
            { name: "철산 래미안 자이", address: "철산동 312", area: "84.99㎡", floor: "22층", price: "11.5억", date: "2026.01.22" },
            { name: "광명역 자이", address: "일직동 566", area: "84.97㎡", floor: "35층", price: "12.8억", date: "2026.01.18" },
        ],
    },
    "gyeonggi-goyang": {
        region: "경기 고양시",
        apartments: [
            { name: "킨텍스 꿈에그린", address: "대화동 2605", area: "84.99㎡", floor: "25층", price: "8.5억", date: "2026.01.23" },
            { name: "일산 자이", address: "장항동 856", area: "114.97㎡", floor: "18층", price: "9.8억", date: "2026.01.20" },
        ],
    },
    "busan-haeundae": {
        region: "부산 해운대구",
        apartments: [
            { name: "엘시티", address: "우동 1495", area: "186.01㎡", floor: "85층", price: "44.9억", date: "2025.12.23" },
            { name: "해운대 아이파크", address: "우동 1407", area: "84.99㎡", floor: "42층", price: "12.5억", date: "2026.01.22" },
        ],
    },
    "busan-nam": {
        region: "부산 남구",
        apartments: [
            { name: "더블유", address: "용호동 1033", area: "142.15㎡", floor: "42층", price: "28.0억", date: "2026.01.05" },
            { name: "대연 힐스테이트", address: "대연동 1852", area: "84.99㎡", floor: "25층", price: "8.5억", date: "2026.01.22" },
        ],
    },
    "busan-suyeong": {
        region: "부산 수영구",
        apartments: [
            { name: "광안 자이", address: "광안동 858", area: "84.99㎡", floor: "35층", price: "9.8억", date: "2026.01.23" },
            { name: "민락 더샵", address: "민락동 520", area: "114.97㎡", floor: "28층", price: "12.5억", date: "2026.01.20" },
        ],
    },
    "daegu-suseong": {
        region: "대구 수성구",
        apartments: [
            { name: "범어 자이", address: "범어동 258", area: "84.99㎡", floor: "25층", price: "9.5억", date: "2026.01.22" },
            { name: "황금 푸르지오", address: "황금동 520", area: "114.97㎡", floor: "18층", price: "8.2억", date: "2026.01.18" },
        ],
    },
    "incheon-yeonsu": {
        region: "인천 연수구",
        apartments: [
            { name: "송도 더샵 마스터뷰", address: "송도동 23", area: "84.99㎡", floor: "45층", price: "9.8억", date: "2026.01.23" },
            { name: "송도 자이", address: "송도동 168", area: "114.97㎡", floor: "35층", price: "11.5억", date: "2026.01.20" },
        ],
    },
    "incheon-namdong": {
        region: "인천 남동구",
        apartments: [
            { name: "논현 포레자이", address: "논현동 670", area: "84.99㎡", floor: "28층", price: "6.8억", date: "2026.01.22" },
            { name: "구월 아시아드", address: "구월동 1138", area: "84.97㎡", floor: "22층", price: "5.5억", date: "2026.01.18" },
        ],
    },
};
