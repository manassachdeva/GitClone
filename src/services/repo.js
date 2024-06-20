import axios from "axios";

export const getSearchPublicRepos = async (search, popularity, updated, language, { perPage = 10, page = 1 } = {}) => {
    if(!search) {
        return [];
    }

    try {
        let query = "";

        if (language) {
            query = `${query}language:${language}`;
        }

        if (popularity) {
            query = `${query}&stars:>=1&sort=stars&order=desc`;
        } else if (updated) {
            query = `${query}&sort=updated&order=desc`;
        }
         
        
        query = `${query}&per_page=${perPage}&page=${page}`;

        console.log(query);

        const response = await axios.get(`https://api.github.com/search/repositories?q=${search} ${query}`, {
            headers: {
                'Accept': 'application/vnd.github+json, application/json',
            }
        });

        if(response.status !== 200) {
            throw new Error(`Error fetching user repos, response status: ${response.status}`);
        }

        return response.data.items;
    } catch(err) {
        console.error(err);
        
        return {};
    }
}