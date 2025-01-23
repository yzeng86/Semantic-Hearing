"use client"

import { useState, useEffect } from "react"
import * as Slider from "@radix-ui/react-slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SoundSliderProps {
  name: string
  isActive: boolean
  onValueChange: (value: number) => void
  onMuteChange: (isMuted: boolean) => void
  initialValue: number
  initialMuted: boolean
}

export function SoundSlider({
  name,
  isActive,
  onValueChange,
  onMuteChange,
  initialValue,
  initialMuted,
}: SoundSliderProps) {
  const [value, setValue] = useState(initialValue)
  const [isMuted, setIsMuted] = useState(initialMuted)

  useEffect(() => {
    onValueChange(value)
  }, [value, onValueChange])

  useEffect(() => {
    onMuteChange(isMuted)
  }, [isMuted, onMuteChange])

  if (!isActive) {
    return null
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <Label htmlFor={`slider-${name}`}>{name}</Label>
        <div className="flex items-center">
          <Checkbox
            id={`mute-${name}`}
            checked={isMuted}
            onCheckedChange={(checked) => setIsMuted(checked as boolean)}
          />
          <Label htmlFor={`mute-${name}`} className="ml-2">
            Mute
          </Label>
        </div>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[value]}
        onValueChange={([newValue]) => setValue(newValue)}
        max={100}
        step={1}
        aria-label="Volume"
      >
        <Slider.Track className="bg-slate-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-slate-900 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-slate-900 rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          aria-label="Volume"
        />
      </Slider.Root>
    </div>
  )
}

