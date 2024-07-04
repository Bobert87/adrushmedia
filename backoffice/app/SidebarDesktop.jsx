'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { CalendarIcon, ChartPieIcon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import StickySearchBar from './StickySearchBar';
import { usePathname } from 'next/navigation';



const navigation = [
  { name: 'Dashboard', to: '/', icon: HomeIcon, current: true },
  { name: 'Advertisers', to: '/advertisers', icon: UsersIcon, current: false },
  { name: 'Campaigns', to: '/campaigns', icon: FolderIcon, current: false },
  { name: 'Ads', to: '/ads', icon: CalendarIcon, current: false },
  { name: 'Publishers', to: '/publishers', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', to: '/reports', icon: ChartPieIcon, current: false },
];

const teams = [
  { id: 1, name: 'Heroicons', to: '/heroicons', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', to: '/tailwind-labs', initial: 'T', current: false },
  { id: 3, name: 'Workcation', to: '/workcation', initial: 'W', current: false },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SidebarDesktop() {
  

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.to} 
                    className={classNames(item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6')}>
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        {/* <StickySearchBar setSidebarOpen={setSidebarOpen} /> */}hlas
      </div>
    </>
  )
}
