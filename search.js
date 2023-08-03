
const id="bitcoin"
const searchapi=`https://api.coingecko.com/api/v3/search?query=${id}`

fetch(searchapi).then((response)=>{console.log(response)})