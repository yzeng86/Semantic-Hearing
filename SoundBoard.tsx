"use client"

import { useState, useEffect, useCallback } from "react"
import { SoundSlider } from "./SoundSlider"
import { Button } from "@/components/ui/button"

const SOUND_NAMES = [
  "Bass",
  "Drums",
  "Guitar",
  "Piano",
  "Synth",
  "Vocals",
  "Strings",
  "Brass",
  "Woodwinds",
  "Percussion",
]

interface SoundState {
  isActive: boolean
  value: number
  isMuted: boolean
}

export function SoundBoard() {
  const [soundStates, setSoundStates] = useState<SoundState[]>(
    SOUND_NAMES.map(() => ({ isActive: false, value: 50, isMuted: false })),
  )

  const randomizeSounds = useCallback(() => {
    const randomCount = Math.floor(Math.random() * 8) + 3 // 3 to 10 active sounds
    setSoundStates((prevStates) =>
      prevStates.map((state, index) => ({
        ...state,
        isActive: index < randomCount,
      })),
    )
  }, [])

  useEffect(() => {
    randomizeSounds()
  }, [randomizeSounds])

  const handleValueChange = (index: number, newValue: number) => {
    setSoundStates((prevStates) => prevStates.map((state, i) => (i === index ? { ...state, value: newValue } : state)))
  }

  const handleMuteChange = (index: number, isMuted: boolean) => {
    setSoundStates((prevStates) => prevStates.map((state, i) => (i === index ? { ...state, isMuted } : state)))
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sound Board</h1>
      {SOUND_NAMES.map((name, index) => (
        <SoundSlider
          key={name}
          name={name}
          isActive={soundStates[index].isActive}
          onValueChange={(value) => handleValueChange(index, value)}
          onMuteChange={(isMuted) => handleMuteChange(index, isMuted)}
          initialValue={soundStates[index].value}
          initialMuted={soundStates[index].isMuted}
        />
      ))}
      <Button onClick={randomizeSounds} className="mt-4">
        Randomize Sounds
      </Button>
    </div>
  )
}

