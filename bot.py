from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
import asyncio

BOT_TOKEN = "8836377360:AAE4RjLTHNPHsQOkbC5pr7AaY_tO8dZAyEg"

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    # Кнопка открытия Mini App
    keyboard = types.InlineKeyboardMarkup(inline_keyboard=[
        [types.InlineKeyboardButton(
            text="🚀 Открыть приложение",
            web_app=types.WebAppInfo(url="https://telegramm-bot-six.vercel.app")
        )]
    ])
    
    await message.answer(
        "Привет! Нажми кнопку ниже, чтобы открыть приложение:",
        reply_markup=keyboard
    )

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())