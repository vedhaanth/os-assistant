import { useState, useEffect, useCallback, useRef } from 'react';
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
  SelectChangeEvent
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GetAppIcon from '@mui/icons-material/GetApp';
import type { Dayjs } from 'dayjs';

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
  const [exporting, setExporting] = useState(false);

  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const createUrlParams = useCallback((): Record<string, string> => {
    const queryParams: Record<string, string> = {};
    Object.entries(searchParamsRef.current).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (value instanceof Object && 'format' in value && typeof value.format === 'function') {
          queryParams[key] = (value as Dayjs).format('YYYY-MM-DD');
        } else {
          queryParams[key] = String(value);
        }
      }
    });
    return queryParams;
  }, []);

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(createUrlParams()).toString();
      const response = await fetch(`/api/internships?${queryParams}`);

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format');
      }

      setResults({
        internships: Array.isArray(data.internships) ? data.internships : [],
        total: typeof data.total === 'number' ? data.total : 0,
        totalPages: typeof data.totalPages === 'number' ? data.totalPages : 0,
        currentPage: typeof data.currentPage === 'number' ? data.currentPage : 1
      });
    } catch (error) {
      console.error('Search error:', error);
      setResults({
        internships: [],
        total: 0,
        totalPages: 0,
        currentPage: 1
      });
    } finally {
      setLoading(false);
    }
  }, [createUrlParams]);

  const handleExport = useCallback(async (format: 'csv' | 'excel') => {
    try {
      setExporting(true);
      const queryParams = new URLSearchParams(createUrlParams()).toString();
      const response = await fetch(`/api/internships/export/${format}?${queryParams}`);

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
    } finally {
      setExporting(false);
    }
  }, [createUrlParams]);

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
  }, [searchParams.page, searchParams.limit, searchParams.sortBy, searchParams.sortOrder, handleSearch]);

  const handleDatePickerChange = (field: keyof SearchParams) => (newValue: Dayjs | null) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          {/* Search Controls */}
          <Box sx={{ width: '100%', mb: 2 }}>
            <TextField
              fullWidth
              label="Search Term"
              name="searchTerm"
              value={searchParams.searchTerm}
              onChange={handleInputChange}
            />
          </Box>

          <Box sx={{
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
          }}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={searchParams.state}
              onChange={handleInputChange}
            />
          </Box>

          <Box sx={{
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
          }}>
            <TextField
              fullWidth
              label="District"
              name="district"
              value={searchParams.district}
              onChange={handleInputChange}
            />
          </Box>

          <Box sx={{
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
          }}>
            <TextField
              fullWidth
              label="Skills (comma-separated)"
              name="skills"
              value={searchParams.skills}
              onChange={handleInputChange}
            />
          </Box>

          <Box sx={{
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
          }}>
            <TextField
              fullWidth
              label="Company Name"
              name="company_name"
              value={searchParams.company_name}
              onChange={handleInputChange}
            />
          </Box>

          <Box sx={{
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
          }}>
            <TextField
              fullWidth
              label="Qualification"
              name="qualification"
              value={searchParams.qualification}
              onChange={handleInputChange}
            />
          </Box>

          <Box sx={{
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
          }}>
            <TextField
              fullWidth
              label="Position Type"
              name="intern_title"
              value={searchParams.intern_title}
              onChange={handleInputChange}
            />
          </Box>

          <Box sx={{
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
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
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
          }}>
            <DatePicker
              label="Start Date"
              value={searchParams.startDate}
              onChange={handleDatePickerChange('startDate')}
              slotProps={{
                textField: { fullWidth: true }
              }}
            />
          </Box>

          <Box sx={{
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
          }}>
            <DatePicker
              label="End Date"
              value={searchParams.endDate}
              onChange={handleDatePickerChange('endDate')}
              slotProps={{
                textField: { fullWidth: true }
              }}
            />
          </Box>

          <Box sx={{
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
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
            width: { xs: '100%', sm: '50%', md: '33.33%' },
            p: 1
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

          <Box sx={{ width: '100%', p: 1 }}>
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
                disabled={exporting || loading || !results.internships || results.internships.length === 0}
                startIcon={<GetAppIcon />}
              >
                {exporting ? 'Exporting...' : 'Export CSV'}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleExport('excel')}
                disabled={exporting || loading || !results.internships || results.internships.length === 0}
                startIcon={<GetAppIcon />}
              >
                {exporting ? 'Exporting...' : 'Export Excel'}
              </Button>
            </Stack>
          </Box>
        </Box>
      </LocalizationProvider>

      {/* Results Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          {results.total || 0} Internships Found
        </Typography>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3
        }}>
          {Array.isArray(results.internships) && results.internships.map((internship) => (
            <Box
              key={internship._id}
              sx={{
                width: {
                  xs: '100%',
                  md: 'calc(50% - 12px)'
                }
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {internship.intern_title}
                  </Typography>
                  <Typography color="textSecondary">
                    {internship.company_name}
                  </Typography>
                  <Typography variant="body2">
                    Location: {internship.district}, {internship.state}
                  </Typography>
                  <Typography variant="body2">
                    Qualification: {internship.qualification}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {Array.isArray(internship.skills_required) && internship.skills_required.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

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
    </Box>
  );
};

export default InternshipSearch;