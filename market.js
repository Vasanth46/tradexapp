const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
const coinListElement = document.getElementById('coinList');


async function displayCryptoData(cryptoData) {
  coinListElement.innerHTML = '';
  cryptoData.forEach(coin => {
    const coinElement = document.createElement('div');
    coinElement.classList.add('coin');
    coinElement.innerHTML = `
      <div class="coin-details">
        <img src="${coin.image}" class="coin-image">
        <span class="coin-name" id="${coin.id}">${coin.name}</span>
      </div>
      <div>
        <span class="coin-volume">24h Vol: $${coin.total_volume.toFixed(2)}</span>
      </div>
      <div>
        <span class="coin-price">$${coin.current_price.toFixed(2)}</span>
      </div>
      
    `;
    coinListElement.appendChild(coinElement);
  });
}

async function fetchCryptoData(query = '') {
  try {
    const response = await fetch(api);
    const data = await response.json();
    
    if (query.trim() !== '') {
      const filteredData = data.filter(coin => coin.name.toLowerCase().includes(query.toLowerCase()));
      return filteredData;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Something went wrong:", error);
    return [];
  }
}

async function loadMoreData() {
  const cryptoData = await fetchCryptoData();
  displayCryptoData(cryptoData);
}
coinListElement.addEventListener('click',async(e)=>{
  const coinName=e.target.textContent
  const coinId=e.target.id
  window.open(`graph.html?coinName=${coinName}&coinId=${coinId}`, '_blank');
})
searchInput.addEventListener('input', async (event) => {
  const searchQuery = event.target.value.trim();
  const filteredData = await fetchCryptoData(searchQuery);
  displayCryptoData(filteredData);
});



window.addEventListener('scroll', () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    loadMoreData();
  }
});

loadMoreData();

