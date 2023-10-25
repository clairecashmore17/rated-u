import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// importing Apollo
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import RatedFilter from "./components/RatedFilter";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";
import Test from "./components/Test";
import { FilterProvider } from "./utils/GlobalState";
import UniversityProfile from "./components/UniversityProfile";
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <FilterProvider>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rated-filter" element={<RatedFilter />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/university-profile/:universityName"
                element={<UniversityProfile />}
              />
              <Route path="/test" element={<Test />} />
            </Routes>
            <Footer />
          </FilterProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
