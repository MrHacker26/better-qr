import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import z from 'zod'

export const selectOptionValue = z.union([z.string(), z.number(), z.boolean()])
export const selectOption = z.object({
  label: z.string(),
  description: z.string().optional(),
  value: selectOptionValue,
})

export type SelectOptionValue = z.infer<typeof selectOptionValue>
export type SelectOption = z.infer<typeof selectOption>

import { Button } from './button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command'
import { Popover, PopoverTrigger, PopoverContent } from './popover'

import { cn, type WithBasicProps } from '@/lib/utils'

type ComboboxProps = WithBasicProps<{
  placeholder?: string
  options: SelectOption[]
  multiple?: boolean
  value?: SelectOptionValue[] | SelectOptionValue
  onValueChange?: (value?: SelectOptionValue[] | SelectOptionValue) => void
  onSearchChange?: (val: string) => void
  isLoading?: boolean
  disabled?: boolean
}>

export function Combobox({
  placeholder: _placeholder,
  options,
  multiple,
  value,
  onValueChange,
  onSearchChange,
  disabled,
  className,
  style,
  isLoading = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)

  const placeholder = useMemo(() => {
    let placeholder: string | undefined
    if (multiple) {
      const result = z.string().array().safeParse(value)
      if (result.success) {
        placeholder = result.data
          .map((v) => options.find((option) => option.value === v))
          .map((item) => item?.label)
          .filter(Boolean)
          .join(', ')
      }
    }
    const result = z.string().safeParse(value)
    if (result.success) {
      placeholder = options.find(
        (option) => option.value === result.data,
      )?.label
    }

    return placeholder || _placeholder
  }, [multiple, _placeholder, options, value])

  const handleSelect = useCallback(
    (selectedValue: SelectOptionValue) => {
      return () => {
        if (multiple) {
          const result = z
            .union([z.string(), z.number(), z.boolean()])
            .array()
            .safeParse(value)
          if (result.success) {
            if (result.data.includes(selectedValue)) {
              onValueChange?.(result.data.filter((v) => v !== selectedValue))
            } else {
              onValueChange?.([...result.data, selectedValue])
            }
          } else {
            onValueChange?.([selectedValue])
          }
        } else {
          onValueChange?.(selectedValue === value ? undefined : selectedValue)
          setOpen(false)
        }
      }
    },
    [multiple, value, onValueChange],
  )

  const isSelected = useCallback(
    (selectedValue: SelectOptionValue) => {
      if (multiple) {
        const result = selectOptionValue.array().safeParse(value)
        if (result.success) {
          return result.data.includes(selectedValue)
        }
        return false
      } else {
        return value === selectedValue
      }
    },
    [value, multiple],
  )

  const [searchText, setSearchText] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          icon={<ChevronDownIcon />}
          iconPosition="right"
          variant="outline"
          className={cn('justify-between', className)}
          style={style}
        >
          {placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Select..."
            value={searchText}
            onValueChange={(val) => {
              setSearchText(val)
              onSearchChange?.(val)
            }}
          />
          <CommandList className="max-h-[50vh]">
            {isLoading ? (
              <CommandEmpty>Fetching data...</CommandEmpty>
            ) : (
              <CommandEmpty>No option found</CommandEmpty>
            )}

            <CommandGroup>
              {!isLoading &&
                options.map((option) => {
                  return (
                    <CommandItem
                      key={String(option.value)}
                      onSelect={handleSelect(option.value)}
                      disabled={disabled}
                    >
                      <span className="flex-1">{option.label}</span>
                      {isSelected(option.value) ? (
                        <CheckIcon className="size-4" />
                      ) : null}
                    </CommandItem>
                  )
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
