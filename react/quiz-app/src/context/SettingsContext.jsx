/**
 * Create a context to manage the app settings and provide this context to the components that need access to the settings.
 *
 * Persisting Settings:
 * Use localStorage to remember user preferences across sessions.
 */

import React, { createContext, useContext, useState, useEffect } from "react";

const defaultSettings = {
  level: "easy",
  numberOfQuestions: 10,
  questionTimeLimit: 10,
  theme: "dark",
  timeLimits: { game: 60, question: 10 },
};

const SettingsContext = createContext(defaultSettings);

// Provider Component:
// Manages the app settings state and exposes it to its children using the context.
export const SettingsProvider = ({ children }) => {
  console.log("SettingsProvider: render ...");

  // Loading state from External Source:
  // In some cases, you might initialize your context state by fetching data from an external source like an API.
  // If you pass a function as initialState , it will be treated as an initializer function.
  // It should be pure, should take no arguments, and should return a value of any type. will be executed only on the initial render
  const [appSettings, setAppSettings] = useState(initializeState);

  // Note that initial mount takes place before useEffect loads settings from storage.
  // Function to load settings from local storage. If none, return default Settings.
  // This ensures that reloading the settings page won't overwrite the stored settings with defaults.
  // If the settings provider resets to its default state on each reload, then the useEffect runs to saveLocal, load settings from local storage,
  function initializeState() {
    console.log("SettingsProvider: Initializing state...");
    const storedSettings = loadState();
    return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
  }

  // Function to load settings from local storage
  function loadState() {
    return localStorage.getItem("quizapp-settings");
  }

  // Persist the state of Context.Provider, Serialize state to localStorage
  const saveState = () => {
    localStorage.setItem("quizapp-settings", JSON.stringify(appSettings));
  };

  // Save settings to local storage when Provider's state changes.
  useEffect(() => {
    saveState();
  }, [appSettings]);

  return (
    <SettingsContext.Provider
      value={{
        appSettings,
        setAppSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettingsContext() {
  return useContext(SettingsContext);
}
