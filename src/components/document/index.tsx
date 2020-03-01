import React from 'react';
import Vose from '../vose';
import Header from '../header';
import VideoList from '../video-list';
import Player from '../player';
import Message from '../message';
import Dropdown from '../dropdown';
import Sort from '../sort';

export default function Document({}: {}) {
  return (
    <Vose
      error={error => <Message error={error} />}
      header={({ setFilter, filters }) => (
        <Header>
          <Sort>
            {filters.map((filter, index) => (
              <Dropdown
                id={filter.title}
                items={filter.items}
                currentItem={filter.currentItem}
                onChange={setFilter}
              />
            ))}
          </Sort>
        </Header>
      )}
      app={() => (
        <>
          <Player />
          <VideoList />
        </>
      )}
    />
  );
}
