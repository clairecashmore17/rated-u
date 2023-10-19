import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

function UniversityList(item) {
  const { _id, university_name } = item;
  return (
    <>
      <p>{university_name}</p>
    </>
  );
}

export default UniversityList;
