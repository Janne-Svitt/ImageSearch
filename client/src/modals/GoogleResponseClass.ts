import ResponseDataClass from "./ResponseDataClass";

class GoogleResponseClass {
  constructor(
    public items: ResponseDataClass,
    public searchInformation: {
      formattedSearchTime: "";
      formattedTotalResults: "";
    }
  ) {}
}

export default GoogleResponseClass;
