const callApiBtn = document.getElementById("callApiBtn");
const keywordInput = document.getElementById("keywordInput");
const result = document.getElementById("result");

// Thay link này bằng link Vercel API thật của bạn
const API_BASE_URL = "https://page-api-rtk.vercel.app";

callApiBtn.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();

  result.textContent = "Đang gọi API...";

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/request?keyword=${encodeURIComponent(keyword)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Gọi API thất bại");
    }

    result.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error(error);

    result.textContent = JSON.stringify(
      {
        success: false,
        message: "Lỗi khi gọi API",
        error: error.message
      },
      null,
      2
    );
  }
});