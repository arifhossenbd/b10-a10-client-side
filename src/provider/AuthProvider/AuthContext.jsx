/**
 * AuthContext - A React context for authentication data.
 *
 * This context provides a way to share authentication-related data
 * across the entire application without having to pass props down
 * manually at every level.
 *
 * Usage:
 *
 * 1. Wrap your component tree with AuthContext.Provider and provide
 *    the necessary value.
 * 2. Use AuthContext.Consumer or useContext(AuthContext) to access
 *    the authentication data in any component.
 *
 * Example:
 *
 * <AuthContext.Provider value={authData}>
 *   <YourComponent />
 * </AuthContext.Provider>
 *
 * const authData = useContext(AuthContext);
 *
 */
import { createContext } from "react";

export const AuthContext = createContext(); // Create a context for anywhere access data
