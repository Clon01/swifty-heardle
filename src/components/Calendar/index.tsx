import React from "react";
import Calendar from 'react-calendar'

import * as Styled from "./index.styled";

export function Calendar() {
  const [value, onChange] = useState<Date | null | (Date | null)[]>(new Date());
  return (
    <div>
      <Styled.Text>
          <Calendar onChange={(nextValue) => onChange(nextValue)} showWeekNumbers value={value} />
      </Styled.Text>
    </div>
  );
}
