export interface CommunicateTopic {
  id: string;
  title: string;
  subtitle: string;
  hasAudio: boolean;
}

export const communicateTopics: CommunicateTopic[] = [
  { id: "lan-dau-gap-mat",   title: "Lần đầu gặp mặt",             subtitle: "First Meeting",             hasAudio: true },
  { id: "hoi-tham-ban-be",   title: "Hỏi thăm bạn bè",             subtitle: "Asking About Friends",      hasAudio: true },
  { id: "vui-mung-hanh-phuc",title: "Vui mừng hạnh phúc",          subtitle: "Joy & Happiness",           hasAudio: true },
  { id: "lo-lang-buon-chan",  title: "Lo lắng buồn chán",           subtitle: "Worries & Sadness",         hasAudio: false },
  { id: "nha-hang",          title: "Giao tiếp tại nhà hàng",       subtitle: "At the Restaurant",         hasAudio: true },
  { id: "hieu-thuoc",        title: "Giao tiếp tại hiệu thuốc",     subtitle: "At the Pharmacy",           hasAudio: true },
  { id: "ngan-hang",         title: "Giao tiếp tại ngân hàng",      subtitle: "At the Bank",               hasAudio: true },
  { id: "buu-dien",          title: "Giao tiếp tại bưu điện",       subtitle: "At the Post Office",        hasAudio: true },
  { id: "nha-ga",            title: "Giao tiếp tại nhà ga",         subtitle: "At the Train Station",      hasAudio: true },
  { id: "rap-chieu-phim",    title: "Giao tiếp tại rạp chiếu phim", subtitle: "At the Cinema",            hasAudio: true },
  { id: "benh-vien",         title: "Giao tiếp tại bệnh viện",      subtitle: "At the Hospital",           hasAudio: true },
  { id: "tham-quan",         title: "Giao tiếp đi tham quan",       subtitle: "Sightseeing",               hasAudio: true },
  { id: "mua-sam",           title: "Giao tiếp đi mua sắm",         subtitle: "Shopping",                  hasAudio: true },
  { id: "so-thich",          title: "Nói về sở thích",              subtitle: "Talking About Hobbies",     hasAudio: true },
  { id: "xin-phep",          title: "Đề nghị xin phép",             subtitle: "Making Requests",           hasAudio: true },
  { id: "part-2",            title: "Mẫu câu giao tiếp (Part 2)",   subtitle: "Conversation Patterns",     hasAudio: false },
];
