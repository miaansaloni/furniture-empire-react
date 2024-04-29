import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants";
import Cart from "./Cart";

const Navbar = () => {
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${baseApiUrl}/pages?page=${currentPage}`)
      .then((res) => {
        // recupera i dati della paginazione dagli header
        setLastPage(parseInt(res.headers.get("X-WP-TotalPages")));
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, [currentPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  function generatePaginationArray() {
    let paginationArr = [];
    for (let index = 1; index <= lastPage; index++) {
      paginationArr.push({
        n: index,
        active: currentPage === index,
      });
    }
    return paginationArr;
    /*
        [
            {
                n: 1,
                active: false
            },
            {
                n: 2,
                active: true
            },
            {
                n: 3,
                active: false
            },
    
        ]
        */
  }

  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/pages/${post.id}`}>{post.title.rendered}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
