import Utils from "../utils.js";
import Clubs from "../data/local/clubs.js";

const home = () => {
  const searchFormElement = document.querySelector("search-bar");

  const clubListContainerElement = document.querySelector("#clubListContainer");
  const clubQueryWaitingElement = clubListContainerElement.querySelector(".query-waiting");
  const clubLoadingElement = clubListContainerElement.querySelector(".search-loading");
  const clubListElement = clubListContainerElement.querySelector(".club-list");
  const listElement = clubListContainerElement.querySelector("club-list");

  const showSportClub = (query) => {
    showLoading();

    const result = Clubs.searchClub(query);
    displayResult(result);

    showClubList();
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    const { query } = event.detail;
    showSportClub(query);
  };

  const displayResult = (clubs) => {
    listElement.innerHTML = clubs
      .map((club) => {
        return `<club-item
        class="club-item"
      ></club-item>`;
      })
      .join("");

    const clubItemElements = listElement.querySelectorAll(".club-item");
    clubs.forEach((club, index) => {
      clubItemElements[index].club = club;
    });
  };

  const showClubList = () => {
    Array.from(clubListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(clubListElement);
  };

  const showLoading = () => {
    Array.from(clubListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(clubLoadingElement);
  };

  const showQueryWaiting = () => {
    Array.from(clubListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(clubQueryWaitingElement);
  };

  searchFormElement.addEventListener("search", onSearchHandler);
  showQueryWaiting();
};

export default home;
