const url=new URLSearchParams(window.location.search)
const coinId=url.get('coinId')
const coinName=url.get('coinName')
const coinImg=url.get('coinImg')
const api = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`;
const text=document.querySelector('.text')
text.innerHTML+= `${coinName}`
let t;
let p;

fetch(api)
  .then(response => response.json())
  .then(data => {
    const prices = data.prices;
    
    if (!prices || prices.length === 0) {
      console.error("No price data available.");
      return;
    }

     p = prices.map(entry => entry[1]);
   

     t = prices.map(entry => {
      const date = new Date(entry[0]);
      return date.toLocaleString();
    });

  
    const ctx = document.getElementById("price-chart");
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: t,
        datasets: [{
          label: `${coinName} USD`,
          data: p,
          borderWidth: 2,
          borderColor:'#ff960b',
          pointRadius:0
          
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: 'white', // Set color for legend labels
              font: {
                family: 'sans-serif', // Set font family to sans-serif
                weight: 'bold', 
                size:16
              }
            }
          }
        },
        scales: {
          x: {
            
            display: false,
            
            
          },
          y: {
            
            beginAtZero: true,
            grid: {
              color: 'white', // Set color for y-axis grid lines
            },
            ticks: {
              color: 'white', 
              font: {
                family: 'sans-serif', // Set font family to sans-serif
                size: 14, // Set font size to 10px
              }
            }
          }
        }
      }
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });


