import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import ReactPaginate from 'react-paginate'
import { useNavigate } from "react-router-dom";

function Home() {
  const [repos, setRepos] = useState([]);
  const [githublist, setgithubList] = useState(repos);
  const [searchField, setSearchfield] = useState("");
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/frankillumate/repos",
          {
            headers: {
              Authorization: import.meta.env.VITE_TOKEN
              
              // "Bearer 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",
            },
          }
        );
        if (!response.ok) {
          throw new Error("failed to fetch repos");
        }
        const data = await response.json();
        setRepos(data);

        console.log(data);
      } catch (error) {}
    };
    fetchRepos();
  }, []);


  useEffect(() => {
    const filteredSearch = repos.filter((repo) => {
      return repo.name.toLowerCase().includes(searchField);
    });

    setgithubList(filteredSearch);
  }, [repos, searchField]);

  console.log(repos);
  function fetchInputValue(e) {
    const searchFieldString = e.target.value.toLowerCase();
    setSearchfield(searchFieldString);
  }

  const cardPerPage = 4
  const pageVisted = pageCount * cardPerPage;
  const resultOfPagesWhenClicked = ({selected})=>{
    setPageCount(selected)
  }

  const displayUsers = githublist.slice(pageVisted, pageVisted + cardPerPage).map((repo)=>{
    return (
      <>
        <div className="display-card" key={repo.id}>
          <h2>{repo.name}</h2>
          <button>
            {" "}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </button>
        </div>
        </>
      )
  })

  const cardCount = Math.ceil(githublist.length / cardPerPage);


  return (
    <>
      <section>
        <div className="banner">GitHub Repository Search🚀</div>
        <form action="submit" className="searchBox">
          <input
            type="search"
            onChange={fetchInputValue}
            placeholder="Enter GitHub Repo"
          />
          <button type="submit">Search</button>
        </form>
        <div className="container">

            {displayUsers}
           
          {/* {githublist.map((repo) => {
            return (
              <div className="display-card" key={repo.id}>
                <h2>{repo.name}</h2>
                <button>
                  {" "}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </button>
              </div>
            );
          })} */}
        </div>
        <ReactPaginate 
            previousLabel="previous"
            nextLabel="next"
            pageCount={cardCount}
            onPageChange={resultOfPagesWhenClicked}
            containerClassName ="paginationcontainer"
            pageClassName = "pagination"
            pageLinkClassName ="pagination"
            activeLinkClassName ="active"
            previousClassName ="previous"
            nextClassName ="next"
            />
      </section>
    </>
  );
}

export default Home;


// Create .env file
// VITE_TOKEN = “” //your token
// Fetch(API, {
// Method: GET,
// headers: { Authorization: import.meta.env.VITE_TOKEN }
// })
