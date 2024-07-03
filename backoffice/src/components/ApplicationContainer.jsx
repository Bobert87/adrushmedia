import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Advertisers from "../pages/Advertisers";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { CalendarIcon, ChartPieIcon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';
import StickySearchBar from './StickySearchBar';
import Campaigns from '../pages/Campaigns';
import Ads from '../pages/Ads';
import Publishers from '../pages/Publishers';


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

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Dialog className="relative z-50 lg:hidden" open={sidebarOpen} onClose={setSidebarOpen}>
        <DialogBackdrop transition className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
        <div className="fixed inset-0 flex">
          <DialogPanel transition className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full">
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link to={item.to} className={classNames(item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6')}>
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                    <ul className="-mx-2 mt-2 space-y-1">
                      {teams.map((team) => (
                        <li key={team.name}>
                          <Link to={team.to} className={classNames(team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6')}>
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">{team.initial}</span>
                            <span className="truncate">{team.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <Link to="/settings" className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                      <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      Settings
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link to={item.to} className={classNames(item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6')}>
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
        <StickySearchBar setSidebarOpen={setSidebarOpen} />
        {/*  */}

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path='/advertisers' element={<Advertisers />} />
              <Route path='/campaigns' element={<Campaigns />} />
              <Route path='/ads' element={<Ads />} />
              <Route path='/publishers' element={<Publishers />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  )
}
