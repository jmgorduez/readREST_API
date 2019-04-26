import { DAY } from './constants'
import moment from 'moment';

function processRepos(responseText, repoNameFilter, repoCreatedDate,
    mapToHTLMElement, appendHTMLElementChild) {
    JSON.parse(responseText)
        .filter(repo => filterRepo(repo, repoNameFilter, repoCreatedDate))
        .sort(sortRepos)
        .map(repo => mapToHTLMElement(repo))
        .forEach(htmlElement => {
            appendHTMLElementChild(htmlElement);
        });
}

function filterRepo(repo, repoNameFilter, repoCreatedDate) {
    return (repoNameFilter.length === 0
        || repo.full_name.search(repoNameFilter.trim()) !== -1)
        && (moment(repo.created_at).isSameOrBefore(repoCreatedDate, DAY));
}

function sortRepos(repo1, repo2) {
    return repo1.full_name.localeCompare(repo2.full_name);
}

export default processRepos;