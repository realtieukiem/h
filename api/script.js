const callApiBtn = document.getElementById("callApiBtn");
const keywordInput = document.getElementById("keywordInput");
const result = document.getElementById("result");

// URL project Vercel API của bạn
const API_BASE_URL = "https://page-api-rtk.vercel.app";

// Key này phải giống PRIVATE_CALL_KEY trong Vercel
// Lưu ý: đặt key ở frontend thì không private tuyệt đối
const PRIVATE_CALL_KEY = "KEY_2026_05_26";

callApiBtn.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();

  if (!keyword) {
    result.textContent = "";
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

    if (!response.ok) {
      result.textContent = data.result || "request failed";
      return;
    }

    result.textContent = data.result;
  } catch (error) {
    console.error(error);
    result.textContent = "request error";
  }
});