import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useUIStore } from "@/lib/ui-store"
import { Button } from "@/components/ui/button"

const QUICK_CHIPS = ["Что такое синдром самозванца?", "Пройти тест", "Упражнения"]

const RESPONSES: Record<string, string> = {
  "Что такое синдром самозванца?":
    "Синдром самозванца — это ощущение, что ваши успехи случайны и вас вот-вот «разоблачат». Он встречается у 70% людей! Хочешь узнать больше или сразу пройти тест?",
  "Пройти тест":
    "Отличная идея! Тест займёт около 5 минут и покажет, насколько выражен синдром самозванца. Открываю...",
  "Упражнения":
    "Здесь собраны 6 практических техник — от дневника достижений до когнитивной работы с мыслями. Открываю комплекс упражнений!",
}

const ACTION_RESPONSES: Record<string, { response: string; action: string }> = {
  "пройти тест": { response: "Открываю тест на синдром самозванца!", action: "test" },
  "открой тест": { response: "Открываю тест!", action: "test" },
  "покажи тест": { response: "Открываю тест!", action: "test" },
  "тест": { response: "Открываю тест!", action: "test" },
  "упражнения": { response: "Открываю комплекс упражнений!", action: "exercises" },
  "открой упражнения": { response: "Открываю упражнения!", action: "exercises" },
  "покажи упражнения": { response: "Вот комплекс упражнений!", action: "exercises" },
  "о проекте": { response: "Открываю раздел о проекте!", action: "about" },
  "про проект": { response: "Открываю раздел о проекте!", action: "about" },
  "что это": { response: "Открываю описание проекта!", action: "about" },
  "родители": { response: "Открываю гайд для родителей!", action: "guide" },
  "гайд": { response: "Открываю методическое руководство для родителей!", action: "guide" },
  "для родителей": { response: "Открываю гайд для родителей!", action: "guide" },
}

type AppType = "about" | "test" | "exercises" | "guide"

export function ChatPanel() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [inputValue, setInputValue] = useState("")
  const { openOS } = useUIStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleChipClick = (chip: string) => {
    const response = RESPONSES[chip] || "Интересный вопрос!"
    const newMessages = [...messages, { text: chip, isUser: true }, { text: response, isUser: false }]
    setMessages(newMessages)

    if (chip === "Пройти тест") {
      setTimeout(() => openOS("test" as AppType), 1000)
    } else if (chip === "Упражнения") {
      setTimeout(() => openOS("exercises" as AppType), 1000)
    }
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue("")

    const lowerMessage = userMessage.toLowerCase()
    const actionMatch = Object.keys(ACTION_RESPONSES).find((key) => lowerMessage.includes(key))

    if (actionMatch) {
      const { response, action } = ACTION_RESPONSES[actionMatch]
      setMessages((prev) => [...prev, { text: userMessage, isUser: true }, { text: response, isUser: false }])
      setTimeout(() => {
        openOS(action as AppType)
      }, 1000)
    } else {
      const defaultResponse =
        "Попробуй написать «пройти тест», «упражнения», «гайд для родителей» или «о проекте» — я открою нужный раздел!"
      setMessages((prev) => [...prev, { text: userMessage, isUser: true }, { text: defaultResponse, isUser: false }])
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 space-y-3 h-32 overflow-y-auto scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                msg.isUser ? "bg-[#FF2E63] text-white" : "bg-white text-black"
              }`}
            >
              <p className="text-sm font-medium leading-tight">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleInputSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напиши «пройти тест» или задай вопрос..."
            className="flex-1 p-3 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white text-black font-medium text-sm focus:outline-none focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] transition-all"
          />
          <Button
            type="submit"
            className="bg-[#FF2E63] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold px-4"
          >
            Отправить
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 justify-center">
        {QUICK_CHIPS.map((chip) => (
          <Button
            key={chip}
            onClick={() => handleChipClick(chip)}
            className="bg-white text-black border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold text-xs px-3 py-2 h-auto"
          >
            {chip}
          </Button>
        ))}
      </div>
    </div>
  )
}