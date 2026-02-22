### What is the difference between null and undefined?

- জাভাস্ক্রিপ্টে **undefined** ও **null** দুইটা দিয়েই নো ভ্যালু রিপ্রেসেন্ট করে। **undefined** তখনই হয় যখন কোনো ভ্যারিয়েবল এ ভ্যালু এসাইন করা হয় না। আর **null** তখনি হয় যখন কোনো ভ্যারিয়েবল এ ইচ্ছা কৃত ভাবে **null** এসাইন করা হয়।

---

### What is the use of the map() function in JavaScript? How is it different from forEach()?

- **map()** ফাঙ্কশন কোনো একটা **array** কে নিয়ে কিছু কাজ করে নতুন একটা **array** রিটার্ন করে। **forEach()** মেথড কোনো একটা **array** কে নিয়ে লুপ করে কিসু একটা কাজ করে কিন্তু কিছু রিটার্ন করে না।

---

### What is the difference between == and ===?

- **==** শুধু মাত্র ভ্যালু দুইটাকে compare করে। এক্ষেত্রে সে দুইটাকে same টাইপ এ কনভার্ট করে নেয়। **===** ভ্যালু এর সাথে টাইপ কেও compare করে।

---

### What is the significance of async/await in fetching API data?

- **async/await** **asynchronous** অপারেশন গুলোকে হ্যান্ডেল করে **API** ফেচ করার ক্ষেত্রে।

---

### Explain the concept of Scope in JavaScript (Global, Function, Block).

- **scope** বলতে একটা ভ্যারিয়েবল কোথায় কোথায় accessible সেটা বুঝায়।
  **global scope** : যখন কোনো ভ্যারিয়েবল যেকোনো ফাঙ্কশন অথবা ব্লক এর বাইরে ডিক্লেয়ার করা হয় তখন তাকে গ্লোবাল স্কোপ বলে। এই ভ্যারিয়েবল কে প্রোগ্রাম এর যেকোনো জায়গা থেকে বেবহার করা যায়।
  **function scope** : যখন কোনো ভ্যারিয়েবল কে কোনো নির্দিষ্ট ফাঙ্কশন এর ভিতর ডিক্লেয়ার করা হয় তখন তাকে **function scope** বলে। এই ভ্যারিয়েবল কে শুধু মাত্র ওই নিদিষ্ট ফাঙ্কশন এর ভিতরেই বেবহার করা যায়।
  **block scope** : {} এর ভিতরে **let** এবং **const** দ্বারা যে ভ্যারিয়েবল গুলো ডিক্লেয়ার করা হয় সেগুলাকে **block scope** বলে। **block scope** এর ভ্যারিয়েবল গুলো **var** দিয়ে ডিক্লেয়ার করা যায় না। উদাহরণস্বরূপ **if , for , while** এদের ভিতরে আমরা **block scope** বেবহার করি।
