import type React from "react"
import * as Slider from "@radix-ui/react-slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface AnimalSoundSliderProps {
  name: string
  value: number
  muted: boolean
  onChange: (value: number) => void
  onMute: (muted: boolean) => void
}

export const AnimalSoundSlider: React.FC<AnimalSoundSliderProps> = ({ name, value, muted, onChange, onMute }) => {
  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <Label htmlFor={`slider-${name}`} className="text-sm font-medium">
          {name}
        </Label>
        <div className="flex items-center">
          <Checkbox id={`mute-${name}`} checked={muted} onCheckedChange={(checked) => onMute(checked as boolean)} />
          <Label htmlFor={`mute-${name}`} className="ml-2 text-sm">
            Mute
          </Label>
        </div>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        max={100}
        step={1}
        aria-label={`${name} volume`}
      >
        <Slider.Track className="bg-gray-300 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          aria-label={`${name} volume`}
        />
      </Slider.Root>
    </div>
  )
}

