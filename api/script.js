const callApiBtn = document.getElementById("callApiBtn");
const keywordInput = document.getElementById("keywordInput");
const apiKeyInput = document.getElementById("apiKeyInput");
const result = document.getElementById("result");

const API_BASE_URL = "https://page-api-rtk.vercel.app";

callApiBtn.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();
  const apiKey = apiKeyInput.value.trim();

  if (!keyword) {
    result.textContent = "Vui lòng nhập keyword";
    return;
  }

  if (!apiKey) {
    result.textContent = "Vui lòng nhập API key";
    return;
  }

  result.textContent = "Đang gọi API...";

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/request?keyword=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
        headers: {
          "x-api-key": apiKey
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