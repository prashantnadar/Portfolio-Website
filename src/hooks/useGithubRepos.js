import { useEffect, useState } from "react";

const GITHUB_USERNAME = "prashantnadar";

export default function useGithubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const ignoredRepos = ['prashantnadar', 'Portfolio-Website'];

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true); // set loading to true when fetching
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
        );
        const data = await response.json();
        // console.log("repos data:",data);
        // const filteredRepos = data
        //   .filter((repo) => !repo.fork) // Exclude forked repositories
        //   .slice(0, 6); // Limit to top 6 repositories

         // Filter out the 'prashantnadar' repository and forked ones
        const filteredRepos = data
          .filter( repo => !repo.fork && !ignoredRepos.includes(repo.name))  // Exclude forked and ignoredRepos array values Repos
          .slice(0, 6); // Limit to top 6 repositories

        setRepos(filteredRepos); // Set repos state with fetched data
      } catch (error) {
        setError(error); // Set error if fetch fails
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    }

    fetchRepos();
  }, []);

  return { repos, loading, error };
}
