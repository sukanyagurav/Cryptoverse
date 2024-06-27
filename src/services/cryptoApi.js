import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cryptoApiHeaders={
    'x-rapidapi-key': process.env.REACT_APP_COINS_API_KEY,
    'x-rapidapi-host': process.env.REACT_APP_COINS_HOST
}
const baseUrl='https://coinranking1.p.rapidapi.com';


const createRequest = (url)=>({url,headers:cryptoApiHeaders})
export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptos:builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails:builder.query({
            query:(coinId)=>createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory:builder.query({
            query: ({ coinId, timePeriod }) => {
                return createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`)},
        }),
        getExchanges: builder.query({
         query: () => createRequest('/exchanges'),
       }),
    })
})
export const {
    useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery,useGetExchangesQuery }= cryptoApi