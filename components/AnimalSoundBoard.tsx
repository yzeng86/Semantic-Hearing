"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AnimalSoundSlider } from "./AnimalSoundSlider"
import { getRandomActiveSounds } from "../utils/randomSounds"
import { Button } from "@/components/ui/button"

const ANIMAL_SOUNDS = ["Lion", "Elephant", "Wolf", "Owl", "Dolphin", "Whale", "Eagle", "Monkey", "Frog", "Cricket"]

interface SoundState {
  value: number
  muted: boolean
  active: boolean
}

export const AnimalSoundBoard: React.FC = () => {
  const [sounds, setSounds] = useState<SoundState[]>(
    ANIMAL_SOUNDS.map(() => ({ value: 50, muted: false, active: false })),
  )

  const randomizeSounds = () => {
    const activeSounds = getRandomActiveSounds(Math.floor(Math.random() * 8) + 3)
    setSounds((prevSounds) =>
      prevSounds.map((sound, index) => ({
        ...sound,
        active: activeSounds[index],
      })),
    )
  }

  useEffect(() => {
    randomizeSounds()
  }, [])

  const handleSliderChange = (index: number, newValue: number) => {
    setSounds((prevSounds) => prevSounds.map((sound, i) => (i === index ? { ...sound, value: newValue } : sound)))
  }

  const handleMute = (index: number, muted: boolean) => {
    setSounds((prevSounds) => prevSounds.map((sound, i) => (i === index ? { ...sound, muted } : sound)))
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Animal Sound Board</h1>
      {sounds.map(
        (sound, index) =>
          sound.active && (
            <AnimalSoundSlider
              key={ANIMAL_SOUNDS[index]}
              name={ANIMAL_SOUNDS[index]}
              value={sound.value}
              muted={sound.muted}
              onChange={(value) => handleSliderChange(index, value)}
              onMute={(muted) => handleMute(index, muted)}
            />
          ),
      )}
      <Button onClick={randomizeSounds} className="mt-4 w-full">
        Randomize Animal Sounds
      </Button>
    </div>
  )
}

