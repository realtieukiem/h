const callApiBtn = document.getElementById("callApiBtn");
const keywordInput = document.getElementById("keywordInput");
const result = document.getElementById("result");

const API_BASE_URL = "https://page-api-rtk.vercel.app";

// Key này phải giống PRIVATE_CALL_KEY trong Vercel
const PRIVATE_CALL_KEY = "KEY_2026_05_26";

callApiBtn.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();

  if (!keyword) {
    result.textContent = "Vui lòng nhập keyword";
    return;
  }

  result.textContent = "Đang gọi API...";

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/request?keyword=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
        headers: {
          "x-api-key": PRIVATE_CALL_KEY
        }
      }
    );

    const data = await response.json();

    result.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error(error);
    result.textContent = JSON.stringify(
      {
        success: false,
        error: error.message
      },
      null,
      2
    );
  }
});