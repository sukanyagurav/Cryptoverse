import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cryptoNewsHeaders={
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
	'x-rapidapi-host': process.env.REACT_APP_NEWS_API_HOST
}
const baseUrl='https://news-api14.p.rapidapi.com/v2';


const createRequest = (url)=>({url,headers:cryptoNewsHeaders})
export const cryptoNewsApi = createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptoNews:builder.query({
            query: ({ newsCategory,page }) => createRequest(`/search/articles?query=${newsCategory}&page=${page}&language=en`),
        })
    })
})
export const {
    useGetCryptoNewsQuery }= cryptoNewsApi