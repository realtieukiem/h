const callApiBtn = document.getElementById("callApiBtn");
const keywordInput = document.getElementById("keywordInput");
const result = document.getElementById("result");

// Thay bằng URL Vercel API thật của bạn
const API_BASE_URL = "https://https://page-api-rtk.vercel.app";

callApiBtn.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();

  if (!keyword) {
    result.textContent = "";
    return;
  }

  result.textContent = "Đang gọi API...";

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/request?keyword=${encodeURIComponent(keyword)}`
    );

    const data = await response.json();

    if (data.success) {
      result.textContent = data.result;
    } else {
      result.textContent = "wrong";
    }
  } catch (error) {
    console.error(error);
    result.textContent = "wrong";
  }
});