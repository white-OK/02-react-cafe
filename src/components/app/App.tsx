import { useState } from 'react'
import CafeInfo from '../cafeInfo/CafeInfo'
import VoteOptions from '../voteOptions/VoteOptions'
import VoteStats from '../voteStats/VoteStats'
import Notification from '../notification/Notification'
import css from './App.module.css'
import type { Votes, VoteType } from '../../types/votes'

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0
  })
  const handleVote = (type: VoteType): void => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1
    }))
  }
  const resetVotes = (): void => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0
    })
  }
  
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;
  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions 
        onVote={handleVote} 
        onReset={resetVotes} 
        canReset={totalVotes > 0} 
      />
     {totalVotes > 0 ? (
        <VoteStats 
          votes={votes} 
          totalVotes={totalVotes} 
          positiveRate={positiveRate} 
        />
      ) : (
        <Notification />
      )}
    </div>
  )
}
 
export default App
