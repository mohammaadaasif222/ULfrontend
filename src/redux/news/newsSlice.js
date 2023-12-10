import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk('news/fetchNews', async (searchQuery) => {
  try {
    const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch news');
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchNews.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchNews.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.news = action.payload;
    },
    [fetchNews.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectAllNews = (state) => state.news.news;

export default newsSlice.reducer;
