import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Pagination,
  Stack,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GetAppIcon from '@mui/icons-material/GetApp';
import type { Dayjs } from 'dayjs';
import InternshipResults from './InternshipResults';
import type { MatchedInternship } from '../types';

interface SearchParams {
  searchTerm: string;
  state: string;
  district: string;
  skills: string;
  company_name: string;
  qualification: string;
  intern_title: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  minStipend: number | '';
  maxStipend: number | '';
}

interface Internship {
  _id: string;
  intern_title: string;
  company_name: string;
  state: string;
  district: string;
  qualification: string;
  skills_required: string[];
  createdAt: string;
}

interface SearchResults {
  internships: Internship[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// Convert SearchParams to URLSearchParams compatible object
const toQueryParams = (params: SearchParams): Record<string, string> => {
  const queryParams: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (value instanceof Date) {
        queryParams[key] = value.toISOString();
      } else if (typeof value === 'object' && 'format' in value) {
        // Handle Dayjs object
        queryParams[key] = value.format('YYYY-MM-DD');
      } else {
        queryParams[key] = String(value);
      }
    }
  });
  return queryParams;
};

// Map Internship to MatchedInternship format
const mapToMatchedInternship = (internship: Internship): MatchedInternship => ({
  id: internship._id,
  title: internship.intern_title,
  organization: internship.company_name,
  location: `${internship.district}, ${internship.state}`,
  duration: '3-6 months', // Default duration
  skills: internship.skills_required,
  sector: 'Technology', // Default sector
  type: 'Internship',
  description: `Internship opportunity at ${internship.company_name}`,
  requirements: [internship.qualification],
  matchScore: 75, // Default match score
  matchedSkills: internship.skills_required,
  skillMatch: 75,
  locationMatch: true,
  sectorMatch: true,
});

const InternshipSearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    searchTerm: '',
    state: '',
    district: '',
    skills: '',
    company_name: '',
    qualification: '',
    intern_title: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    startDate: null,
    endDate: null,
    minStipend: '',
    maxStipend: ''
  });

  const [results, setResults] = useState<SearchResults>({
    internships: [],
    total: 0,
    totalPages: 0,
    currentPage: 1
  });

  const [loading, setLoading] = useState(false);

  const handleExport = async (format: 'csv' | 'excel') => {
    try {
      const params = toQueryParams(searchParams);
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`/api/internships/export/${format}?${queryString}`);

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `internships_${Date.now()}.${format === 'excel' ? 'xlsx' : 'csv'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`${format.toUpperCase()} export error:`, error);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = toQueryParams(searchParams);
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`/api/internships?${queryString}`);
      const data = await response.json();
      setResults(data as SearchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePageChange = (_event: unknown, value: number) => {
    setSearchParams(prev => ({
      ...prev,
      page: value
    }));
  };

  useEffect(() => {
    handleSearch();
  }, [searchParams.page, searchParams.limit, searchParams.sortBy, searchParams.sortOrder]);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Search Controls */}
          <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: '8px 0' }}>
            <TextField
              fullWidth
              label="Search Term"
              name="searchTerm"
              value={searchParams.searchTerm}
              onChange={handleInputChange}
              sx={{
                height: 48,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: '100%',
                  '& fieldset': {
                    borderColor: '#3b82f6', // Tailwind blue-500
                  },
                  '&:hover fieldset': {
                    borderColor: '#2563eb', // Tailwind blue-600
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1d4ed8', // Tailwind blue-700
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)',
                  },
                },
                input: {
                  height: '100%',
                  padding: '0 14px',
                  boxSizing: 'border-box',
                },
              }}
            />
          </Box>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3
          }}>
            <Box sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)'
              }
            }}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={searchParams.state}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>

            <Box sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)'
              }
            }}>
              <FormControl fullWidth>
                <InputLabel>District</InputLabel>
                <TextField
                  fullWidth
                  label="District"
                  name="district"
                  value={searchParams.district}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>

            <Box sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)'
              }
            }}>
              <FormControl fullWidth>
                <InputLabel>Skills</InputLabel>
                <TextField
                  fullWidth
                  label="Skills (comma-separated)"
                  name="skills"
                  value={searchParams.skills}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>

            <Box sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)'
              }
            }}>
              <FormControl fullWidth>
                <InputLabel>Company</InputLabel>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="company_name"
                  value={searchParams.company_name}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>

            <Box sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)'
              }
            }}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  name="sortBy"
                  value={searchParams.sortBy}
                  onChange={handleInputChange}
                  label="Sort By"
                >
                  <MenuItem value="createdAt">Date Added</MenuItem>
                  <MenuItem value="company_name">Company Name</MenuItem>
                  <MenuItem value="qualification">Qualification</MenuItem>
                  <MenuItem value="intern_title">Position</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)'
              }
            }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={searchParams.startDate}
                  onChange={(newValue) =>
                    setSearchParams(prev => ({ ...prev, startDate: newValue }))
                  }
                  slotProps={{
                    textField: { fullWidth: true }
                  }}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)'
              }
            }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  value={searchParams.endDate}
                  onChange={(newValue) =>
                    setSearchParams(prev => ({ ...prev, endDate: newValue }))
                  }
                  slotProps={{
                    textField: { fullWidth: true }
                  }}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)'
              }
            }}>
              <TextField
                fullWidth
                label="Minimum Stipend"
                name="minStipend"
                type="number"
                value={searchParams.minStipend}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Box>

            <Box sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)'
              }
            }}>
              <TextField
                fullWidth
                label="Maximum Stipend"
                name="maxStipend"
                type="number"
                value={searchParams.maxStipend}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search Internships'}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleExport('csv')}
                disabled={loading || results.internships.length === 0}
                startIcon={<GetAppIcon />}
              >
                Export CSV
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleExport('excel')}
                disabled={loading || results.internships.length === 0}
                startIcon={<GetAppIcon />}
              >
                Export Excel
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Results Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            {results.total} Internships Found
          </Typography>

          <InternshipResults
            internships={results.internships.map(mapToMatchedInternship)}
            loading={loading}
            onApply={(internship) => {
              console.log('Apply clicked for internship:', internship);
              // Add your apply logic here
            }}
            minMatchScore={0}
          />

          {results.totalPages > 1 && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={results.totalPages}
                page={searchParams.page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default InternshipSearch;