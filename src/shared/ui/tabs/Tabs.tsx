"use client";
import React, { useState } from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
interface ITabItem {
    label: string;
    value: string;
    component: React.ReactNode;
}

interface IRestaurantTabsProps {
    content: ITabItem[];
    defaultActiveTab: string;
}

const Tabs: React.FC<IRestaurantTabsProps> = ({ content, defaultActiveTab }) => {
    const firstTabValue = content[0]?.value;
    const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || firstTabValue);
    const handleChange = (event: React.SyntheticEvent, newActiveTab: string) => {
        setActiveTab(newActiveTab);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <TabContext value={activeTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="Restaurant Tabs"
                        variant="scrollable"
                    >
                        {content.map((item, index) => (
                            <Tab key={index} label={item.label} value={item.value} />
                        ))}
                    </TabList>
                </Box>
                {content.map((item, index) => {
                    return (
                        <TabPanel key={index} value={item.value} sx={{ p: 0 }}>
                            {item.component}
                        </TabPanel>
                    );
                })}
            </TabContext>
        </Box>
    );
};
export default Tabs;
