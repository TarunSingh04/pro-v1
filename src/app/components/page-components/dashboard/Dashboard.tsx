"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Sidebar from "./sidebar/Sidebar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logoutIcon from "../../assets/log-out.svg";
import notifyIcon from "../../assets/notifyIcon'.svg";
import searchIcon from "../../assets/searchIcon.svg";
import pageNotDisplayLogo from "../../assets/pageNotDisplayLogo.svg";
import searchExclaimation from "../../assets/searchHeadtile.svg"; 
import searchShowIcon from "../../assets/searchItemArrowIcon.svg";

const SidebarTabs = [
  {
    tabName: "Dashboard",
    tagNavigate: "/pages/dashboard",
  },
  {
    tabName: "My Tasks",
    tagNavigate: "/pages/mytasks",
  },
  {
    tabName: "Scorecard",
    tagNavigate: "/pages/scorecard",
  },
  {
    tabName: "ESG Progress Report",
    tagNavigate: "/pages/reports",
  },
  {
    tabName: "Sustainability Badge",
    tagNavigate: "/pages/sustainability-badge",
  },
  {
    tabName: "Certificates",
    tagNavigate: "/pages/certificates",
  },
  {
    tabName: "Utilities",
    tagNavigate: "/pages/utilities",
  },
  {
    tabName: "ESG News",
    tagNavigate: "/pages/esgnews",
  },
  {
    tabName: "Marketplace",
    tagNavigate: "/pages/marketplace",
  },
  {
    tabName: "E-learning modules",
    tagNavigate: "/pages/learning",
  },
  {
    tabName: "AI Assistant",
    tagNavigate: "/pages/ai-assistant",
  },
  {
    tabName: "Settings",
    tagNavigate: "/pages/settings",
  },
];

const withDashboardLayout = (WrappedComponent: any, route: string) => {
  const DashboardLayout: React.FC = () => {
    const navigate = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<typeof SidebarTabs>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    useEffect(() => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        setShowSuggestions(false);
        return;
      }

      const filteredResults = SidebarTabs.filter((tab) =>
        tab.tabName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredResults);
      setShowSuggestions(true);
    }, [searchQuery]);

    const navigateTo = (pathname: string) => {
      navigate.push(pathname);
    };

    return (
      <div className={styles.dashboardPageCont}>
        <div className={styles.pageNotDisplay}>
          <Image src={pageNotDisplayLogo} width={160} height={115} alt="none" />
          <p className={styles.pageNotDisplaytitle}>
            Oops! Best Viewed on Desktop
          </p>
          <p className={styles.pageNotDisplaysubtitle}>
            For the Best Experience, Switch to Desktop!
          </p>
          <p className={styles.pageNotDisplaydesc}>
            You&apos;re on a mobile or tablet. For the full experience and all
            site features, please visit us on your desktop.
          </p>
        </div>
        <div className={styles.dashboardPage}>
          <Sidebar defaultRoute={route} />
          <div className={styles.siderbarSpace}></div>
          <div className={styles.Content}>
            <div className={styles.navbar}>
              <div className={styles.searchbar}>
                <Image
                  src={searchIcon}
                  width={26}
                  height={26}
                  alt="none"
                  className={styles.searchIcon}
                />
                <input
                  type="text"
                  placeholder="Search anything"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {showSuggestions && (
                  <div className={styles.suggestionBox}>
                    <div className={styles.headline}>
                      <Image src={searchExclaimation} width={15} height={15} alt="none" className={styles.exclaimIcon}/>
                      <p>Search results {searchResults.length} found</p>
                    </div>
                    {searchResults.length > 0 ? (
                      searchResults.map((result, index) => (
                        <div
                          key={index}
                          className={styles.suggestionItem}
                          onClick={() => navigateTo(result.tagNavigate)}
                        >
                          <p className={styles.tabName}>
                            {result.tabName}
                            <Image src={searchShowIcon} width={10} height={10} alt="none"/>
                          </p>
                          <p className={styles.description}>Search details in the grey sub line</p>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noResults}>No relevant pages found</div>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.notifycont}>
                <div className={styles.notify}>
                  <Image
                    src={notifyIcon}
                    width={16}
                    height={16}
                    alt="none"
                    className={styles.notifyIcon}
                  />
                  <span>2</span>
                </div>
                <div
                  className={styles.logout}
                  onClick={() => {
                    navigateTo("/pages/login-user");
                  }}
                >
                  <Image
                    src={logoutIcon}
                    width={16}
                    height={16}
                    alt="none"
                    className={styles.logoutIcon}
                  />
                  <span>LOG OUT</span>
                </div>
              </div>
            </div>
            <WrappedComponent />
          </div>
        </div>
      </div>
    );
  };

  return DashboardLayout;
};

export default withDashboardLayout;
