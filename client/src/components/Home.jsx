import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <section className="home-container">
      <div className="banner-left">
        <img
          src="/images/banner-vote.png"
          alt="Voting Banner"
          className="banner-img"
        />

      </div>

      <div className="text-right">
        <h1 className="slide-fade">🗳️ DigiVote</h1>
        <p className="slide-fade delay-1">
          Welcome — use the navigation above to explore candidates, cast your vote, and view results.
        </p>
      </div>
    </section>
  );
}
