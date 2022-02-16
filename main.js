import { createApp } from "https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
const daysInMonth = new Date(year, month + 1, 0).getDate();

createApp({
  dailyBudget: parseInt(localStorage.getItem("dailyBudget")) || 0,
  offset: parseInt(localStorage.getItem("offset")) || 0,
  get initialBalance() {
    return this.dailyBudget * daysInMonth + this.offset;
  },
  get title() {
    return today.toDateString();
  },
  get rows() {
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return days.map((day) => ({
      day: new Date(year, month, day).toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
      }),
      balance: this.getBalanceForDay(day),
      style:
        day === today.getDate()
          ? {
              backgroundColor: "lightgreen",
            }
          : {},
    }));
  },
  getBalanceForDay(day) {
    const monthlyBudget = this.dailyBudget * daysInMonth;
    const balance = ((daysInMonth - day) * monthlyBudget) / daysInMonth;
    return balance + this.offset;
  },
  save() {
    localStorage.setItem("dailyBudget", this.dailyBudget);
    localStorage.setItem("offset", this.offset);
  },
}).mount();
