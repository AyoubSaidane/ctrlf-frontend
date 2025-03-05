"use client";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useState } from "react";
import './globals.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleConnect = async () => {
    try {
      console.log('API_URL:', `${API_URL}/connect`);
      const response = await fetch(`${API_URL}/connect`, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Connected:', data);
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <SidebarTrigger />
                  <button 
                    onClick={handleConnect} 
                    className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 border border-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-link">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    Connect
                  </button>
                </div>
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </body>
    </html>
  )
}