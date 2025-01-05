import React, { useEffect, useState } from 'react'

const Summarizer = () => {

    const [url, setUrl] = useState("")
    const [summary, setSummary] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    {/** 
        1. In this summary.jsx we fetch the url that getting from rapid api
        and set state hooks to get summary from api so we use [url, setUrl].
        2. [summary, setSummary] it extarct the content or description or summary from the url and set the Summary
        3. [loading,setLoading] while fetch we give the loading state that get more user experience
        4. [error, setError] to the user experience we use this state that give the message while entering wrong url
        */}

    const fetchSummary = async () => {


        const isvalidUrl =(input)=>{
            // It is used to check the url is valid that given by the user
            try{  
                new URL(input)
                return true
            }
            catch{
                return false
            }
        }

        if (!url.trim() || !isvalidUrl(url)) {  // it checks if it's not a valid url and works this
            setError("Please enter a valid url...")
            setUrl("")
            return
        }

        const apiUrl = `https://extract-and-summarize.p.rapidapi.com/extract/?url=${encodeURIComponent(url)}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '39b8474aaamsh2cb8522cb55abdfp1a5159jsnd7a02746c5cb',
                'x-rapidapi-host': 'extract-and-summarize.p.rapidapi.com'
            }
        };

        setLoading(true)   // if the button click it shows the loading message
        setSummary("")  // if the loading time or empty state it set the Summary state empty string
        setError("")   // as follow the setSummmary

        try {
            const response = await fetch(apiUrl, options);
            const result = await response.json();

            const SummaryExtract = result.description || result.content || result.summary  // we get the extract summary from this

            if (SummaryExtract) {
                setSummary(SummaryExtract)  // if the summaryExtract exists it will update the summary state
            }

            else {
                setError("No summary available for the provided URL....")  // else update the error state to this message instead of setSummary 
            }

        } catch (error) {
            console.error(error);
            setError("An error has been raised try again later...")   // this is used because of the url is false or did not fetch correctly
        }
        finally {
            setLoading(false)   // this block is used for if we get url and get our summary state true it false the loading state and give the summary
            setUrl("")    // it atomattically clear the input after getting summary data
        }
    }
    function handleInputUrl(e) {
        setUrl(e.target.value)   // to get the input value we use this function to update the url state
    }


    return (
        <div className='mt-32 flex justify-center items-center flex-col'>

            {/* input and button */}
            <div className='flex flex-col md:flex-row gap-5 items-center'>
                <input
                    onChange={handleInputUrl}
                    value={url}
                    type="url"
                    className='px-4 h-10 w-[310px] md:w-[600px] rounded-md outline-none placeholder:text-sm'
                    placeholder='Type your url'
                />
                <button
                    onClick={fetchSummary}
                    disabled={loading || !url.trim()}
                    className={`h-10 px-9 rounded-md text-white text-lg font-semibold transition-all 
                    ${loading || !url.trim() ? "bg-gray-600 cursor-not-allowed" :
                            "bg-red-500 hover:bg-red-600 hover:scale-105"}`}>
                    {loading ? "Loading" : "Extract"}
                </button>
            </div>

            <div className='m-5 text-center hover:shadow-xl p-2 border box-border border-green-600 bg-white rounded-lg h-[500px] w-[310px] md:w-[700px] lg:w-[800px] overflow-scroll scrollbar-hide'>
                {/* normal or first or empty state */}
                {!loading && !summary && !error && (
                    <p className='mt-5 text-lg text-red-500 font-medium'>provide url to get summary...</p>
                )
                }

                {/* loading */}
                {
                    loading ?   
                        (
                            <p className='text-xl font-medium text-green-600'>  {/** while loading time is true it show the loading message */}
                                Loading...   
                            </p>
                        )
                        : 
                        (  // while loading false it follows this method
                            summary ?
                                <p   
                                    className='mx-5 mt-5'  // if we get summary state true it shows the content 
                                >{summary}</p>
                                :
                                <p className='text-red-500 text-lg font-medium'>{error}</p> // if the url is wrong or there is no summary it shows this error message
                        ) 
                }
            </div>


        </div>
    )
}

export default Summarizer