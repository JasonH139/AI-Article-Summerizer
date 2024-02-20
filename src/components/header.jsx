import React from 'react'

const header = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
          <img src='/logo.PNG' alt='Article Summerizer Logo' id='logo'/>
          <button type="button"className='black_btn' onClick={()=>window.open('https://github.com/jasonh139')}>Github</button>
        </nav>

        <h1 className='head_text'>Article Summarizer using<br className='max-md:hidden'/> <span className='orange_gradient'>OpenAI GPT-4</span></h1>

    </header>
  )
}

export default header