const tags = [
    {
        label: "Cafe Acoustic",
        value: "cafe-acoustic",
        icon: null,
    },
    {
        label: "Cafe Bình Dân",
        value: "cafe-binh-dan",
        icon: null,
    },
    {
        label: "Cafe Cổ Điển",
        value: "cafe-co-dien",
        icon: null,
    },
    {
        label: "Cafe Lounge",
        value: "cafe-lounge",
        icon: null,
    },
    {
        label: "Cafe Ngoài Trời",
        value: "cafe-ngoai-troi",
        icon: null,
    },
    {
        label: "Cafe Sách",
        value: "cafe-sach",
        icon: null,
    },
    {
        label: "Cafe Sang Trọng",
        value: "cafe-sang-trong",
        icon: null,
    },
    {
        label: "Cafe Thú Cưng",
        value: "cafe-thu-cung",
        icon: null,
    },
    {
        label: "Cafe Tone Màu",
        value: "cafe-tone-mau",
        icon: null,
    },
    {
        label: "Cafe Trên Cao",
        value: "cafe-tren-cao",
        icon: null,
    },
    {
        label: "Cafe View Đẹp",
        value: "cafe-view-dep",
        icon: null,
    },
    {
        label: "Cafe Vườn",
        value: "cafe-vuon",
        icon: null,
    },
    {
        label: "PUB",
        value: "pub",
        icon: null,
    },
]

const benefits = [
    {
        label: "Bàn ngoài trời",
        value: "cafe-acoustic",
        icon: "<i class='fas fa-cloud-sun'></i>",
    },
    {
        label: "Bánh ngọt",
        value: "cafe-binh-dan",
        icon: null,
    },
    {
        label: "Chiếu bóng đá",
        value: "cafe-co-dien",
        icon: null,
    },
    {
        label: "Chỗ chơi cho trẻ em",
        value: "cafe-lounge",
        icon: null,
    },
    {
        label: "Chỗ đậu ôtô",
        value: "cafe-ngoai-troi",
        icon: null,
    },
    {
        label: "Giao hàng",
        value: "cafe-sach",
        icon: null,
    },
    {
        label: "Giữ xe máy",
        value: "cafe-sang-trong",
        icon: null,
    },
    {
        label: "Khu vực hút thuốc",
        value: "cafe-thu-cung",
        icon: null,
    },
    {
        label: "Mang đồ ăn ngoài",
        value: "cafe-tone-mau",
        icon: null,
    },
    {
        label: "Mang thú cưng",
        value: "cafe-tren-cao",
        icon: null,
    },
    {
        label: "Máy lạnh & điều hòa",
        value: "cafe-view-dep",
        icon: null,
    },
    {
        label: "Nhạc sống",
        value: "cafe-vuon",
        icon: null,
    },
    {
        label: "Thanh toán bằng thẻ",
        value: "pub",
        icon: null,
    },
    {
        label: "Wi-Fi miễn phí",
        value: "pub",
        icon: null,
    },
]

const regions = [
    {
        label: "Quận Ba Đình",
        value: "quan-ba-dinh",
        icon: null,
        image: "/static/images/region/ba-dinh.jpeg",
    },
    {
        label: "Quận Bắc Từ Liêm",
        value: "quan-bac-tu-liem",
        icon: null,
        image: "",
    },
    {
        label: "Quận Cầu Giấy",
        value: "quan-cau-giay",
        icon: null,
        image: "/static/images/region/cau-giay.jpeg",
    },
    {
        label: "Quận Đống Đa",
        value: "quan-dong-da",
        icon: null,
        image: "/static/images/region/dong-da.jpeg",
    },
    {
        label: "Quận Hai Bà Trưng",
        value: "quan-hai-ba-trung",
        icon: null,
        image: "",
    },
    {
        label: "Quận Hà Đông",
        icon: null,
        image: "",
    },
    {
        label: "Quận Hoàn Kiếm",
        value: "quan-hoan-kiem",
        icon: null,
        image: "/static/images/region/hoan-kiem.jpeg",
    },
    {
        label: "Quận Hoàng Mai",
        value: "quan-hoang-mai",
        icon: null,
        image: "",
    },
    {
        label: "Quận Long Biên",
        value: "quan-long-bien",
        icon: null,
        image: "",
    },
    {
        label: "Quận Nam Từ Liêm",
        value: "quan-nam-tu-liem",
        icon: null,
        image: "",
    },
    {
        label: "Quận Tây Hồ",
        value: "quan-tay-ho",
        icon: null,
        image: "/static/images/region/tay-ho.jpeg",
    },
    {
        label: "Quận Thanh Xuân",
        value: "quan-thanh-xuan",
        icon: null,
        image: "",
    },
]

const purposes = [
    {
        label: "Chill",
        value: "chill",
        icon: null,
        image: "/static/images/purpose/chill-370x247.png",
    },
    {
        label: "Đọc Sách",
        value: "doc-sach",
        icon: null,
        image: "/static/images/purpose/doc-sach-370x247.png",
    },
    {
        label: "Hẹn Hò",
        value: "hen-ho",
        icon: null,
        image: "/static/images/purpose/hen-ho-330x220.png",
    },
    {
        label: "Làm Việc",
        value: "lam-viec",
        icon: null,
        image: "/static/images/purpose/lam-viec.jpeg",
    },
    {
        label: "Sống Ảo",
        value: "song-ao",
        icon: null,
        image: "/static/images/purpose/song-ao-370x247.png",
    },
]

const place = {
    label: "Ban công cafe",
    desc: "Nằm trong biệt thự Pháp cổ, Ban Công Cafe nghiễm nhiên được tận hưởng trọn vẹn nét cổ kính, trầm mặc. Những bức tường ve vàng, cầu thang, nền gạch hoa…dường như bị thời gian bỏ quên. Ở đây không mang phong cách bao cấp thường thấy, mà cổ theo lối quý tộc.",
    address: "2 Đinh Liệt, Hoàn Kiếm",
    photos: [
        "/static/images/place/ban-cong-cafe/ban-cong-cafe-10.jpeg",
        "/static/images/place/ban-cong-cafe/ban-cong-cafe-1.jpeg",
        "/static/images/place/ban-cong-cafe/ban-cong-cafe-2.jpeg",
        "/static/images/place/ban-cong-cafe/ban-cong-cafe-6.jpeg",
        "/static/images/place/ban-cong-cafe/ban-cong-cafe-7.jpeg",
        "/static/images/place/ban-cong-cafe/ban-cong-cafe-4.jpeg",
        "/static/images/place/ban-cong-cafe/ban-cong-cafe-5.jpeg",
        "/static/images/place/ban-cong-cafe/ban-cong-cafe-3.jpeg",
        "/static/images/place/ban-cong-cafe/ban-cong-cafe-8.jpeg",
        "/static/images/place/ban-cong-cafe/ban-cong-cafe-9.jpeg",
    ],
}

export { purposes, benefits, regions, tags, place }
