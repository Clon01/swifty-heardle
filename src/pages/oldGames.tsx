
import * as React from "react";

export default function OldGames() {
  
  
  return (
    <div className="page">
     <Header openInfoPopUp={openInfoPopUp} />
      {isInfoPopUpOpen && <InfoPopUp onClose={closeInfoPopUp} />}
      <Styled.Container>
        <Game
          guesses={guesses}
          didGuess={didGuess}
          todaysSolution={todaysSolution}
          currentTry={currentTry}
          setSelectedSong={setSelectedSong}
          skip={skip}
          guess={guess}
        />
      </Styled.Container>
      <Footer />
    </div>
  );
}
