import { IconType } from 'react-icons'
import {
    FiMonitor,
    FiServer,
    FiLayers,
    FiSmartphone,
    FiGitBranch,
    FiBarChart2,
    FiStar,
    FiAward,
    FiShield,
} from 'react-icons/fi'

export const roles: { value: string; label: string; icon: IconType }[] = [
    {
        value: 'frontend',
        label: 'FrontEnd Developer',
        icon: FiMonitor,
    },
    {
        value: 'backend',
        label: 'BackEnd Developer',
        icon: FiServer,
    },
    {
        value: 'fullstack',
        label: 'FullStack Developer',
        icon: FiLayers,
    },
    {
        value: 'mobile',
        label: 'Mobile Developer',
        icon: FiSmartphone,
    },
    {
        value: 'devops',
        label: 'DevOps Developer',
        icon: FiGitBranch,
    },
    {
        value: 'data',
        label: 'Data Scientist',
        icon: FiBarChart2,
    },
]

export const difficulties: { value: string; label: string; icon: IconType }[] = [
    {
        value: 'junior',
        label: 'Junior',
        icon: FiStar,
    },
    {
        value: 'mid',
        label: 'Mid-Level',
        icon: FiAward,
    },
    {
        value: 'senior',
        label: 'Senior',
        icon: FiShield,
    },
]
