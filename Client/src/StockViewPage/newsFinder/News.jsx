import { useState, useEffect } from 'react';
import { List, CustomListItem, Select, Option } from '@ui5/webcomponents-react';
import axios from 'axios';

const NewsComponent = () => {
  const [category, setCategory] = useState('general');
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
    
 
    const interval = setInterval(() => {
      fetchNews();
      console.log("Updated news");
    }, 300000); 


    return () => clearInterval(interval);
  }, [category]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/news?category=${category}&token=cp2khlpr01qtd8fslun0cp2khlpr01qtd8fslung`);
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.detail.selectedOption.dataset.key);
  };

  return (
    <div className="max-w-2xl mx-auto p-5 shadow-lg rounded-lg bg-white">
      <Select
        onChange={handleCategoryChange}
        className="w-full mb-5 p-2 border border-gray-300 rounded-md"
      >
        <Option data-key="general" selected={category === 'general'}>
          General
        </Option>
        <Option data-key="forex" selected={category === 'forex'}>
          Forex
        </Option>
        <Option data-key="crypto" selected={category === 'crypto'}>
          Crypto
        </Option>
        <Option data-key="merger" selected={category === 'merger'}>
          Merger
        </Option>
      </Select>
      <List className="w-full max-h-96 rounded-lg overflow-y-auto border border-gray-300 p-3">
        {news.map((item) => (
          <CustomListItem
            key={item.id}
            className="flex justify-between items-center p-3 mb-3 rounded-lg border border-gray-200 shadow-sm transition duration-300 hover:bg-gray-100"
          >
            <div className="flex-1 text-left">
              <p className="font-bold text-black">{item.headline}</p>
              <div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500">
                  Read More
                </a>
              </div>
            </div>
          </CustomListItem>
        ))}
      </List>
    </div>
  );
};

export default NewsComponent;