import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLazyGetSummaryQuery } from '../services/article'
import copy from '/copy.svg'
import loader from '/loader.svg'
import check from '/check.svg'

const summerize = () => {
  const [article, setArticle] = useState({
    url:'',
    summary:''
  });

  const [allArticles, setArticles] = useState([]);


  const[copied, setCopied] = useState("");

  const[getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  useEffect(()=>{
    const localArticleStorage = JSON.parse(localStorage.getItem('articles'));

    if(localArticleStorage){
      setArticles(localArticleStorage);
    }
  }, []);

  const handleCopy = (url) => {
    setCopied(url);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(""),2000);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const {data} = await getSummary({articleUrl : article.url})
    if(data?.summary){
      const update = {...article, summary: data.summary};
      const updateAll = [update, ...allArticles]
      setArticle(update);
      setArticles(updateAll);
      localStorage.setItem('articles', JSON.stringify(updateAll))
    }
  }

  return (
    <div className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center' 
              onSubmit={handleSubmit}>
          <img src='/link.svg' 
              className='absolute w-5 left-0 ml-3'/>
          <input type='url' placeholder='Enter a URL' value={article.url} 
                onChange={(e)=>{setArticle({
                  url: e.target.value
                })}} 
                required className='input peer'/>

          <button type='submit' className='submit peer-focus:border-gray-700 peer-focus:border'>
                  <img src='/enter.svg' className='rounded'/>
          </button>
        </form>
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((article, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(article)} className='link_card'>
              <div className='copyBtn' onClick={()=>{handleCopy(article.url)}}>
                <img src={copied == article.url ? check : copy} alt = {copied == article.url ? 'Check Mark' : 'Copy Icon'} className='object-contain h-4 w-4'/>
              </div>
              <p className='flex-1 text-blue-700 text-sm truncate mr-8 text-center'>
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ?(
          <img src={loader} alt='Loading' className='w-20 h-20 object-contain'/>
        ): error?(
          <p>{error?.data?.error}</p>
        ):(
          article.summary && (
            <div className='flex flex-col gap-3 justify-center'>
              <h2 className='font-bold text-xl text-center'>
                Article <span className='orange_gradient'>Summary</span>
              </h2>
              <div className='summary'>
                <p className=' font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
         )
        }
      </div>
    </div>
  )
}

export default summerize