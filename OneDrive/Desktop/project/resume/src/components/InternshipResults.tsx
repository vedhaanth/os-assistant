import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Divider,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  LocationOn,
  Business,
  School,
  WorkOutline,
  TrendingUp,
  CheckCircle,
  Error,
  Info as InfoIcon
} from '@mui/icons-material';

import type { MatchedInternship } from '../types';

interface InternshipResultsProps {
  internships: MatchedInternship[];
  loading: boolean;
  onApply?: (internship: MatchedInternship) => void;
  minMatchScore?: number;
}

const InternshipResults: React.FC<InternshipResultsProps> = ({
  internships,
  loading,
  onApply,
  minMatchScore
}) => {
  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading internships...</Typography>
      </Box>
    );
  }

  // Filter internships by minimum match score if provided
  const filteredInternships = minMatchScore
    ? internships.filter(internship => internship.matchScore >= minMatchScore)
    : internships;

  if (!filteredInternships || filteredInternships.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>
          {minMatchScore
            ? `No internships found with a match score of ${minMatchScore}% or higher.`
            : 'No internships found matching your criteria.'}
        </Typography>
      </Box>
    );
  }

  // Sort internships by match score
  filteredInternships.sort((a, b) => b.matchScore - a.matchScore);

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 3,
      p: 2
    }}>
      {filteredInternships.map((internship) => (
        <Box
          key={internship.id}
          sx={{
            width: {
              xs: '100%',
              md: 'calc(50% - 12px)'
            },
            display: 'flex'
          }}
        >
          <Card
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              }
            }}
          >
            <CardContent>
              {/* Match Score Indicator */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Tooltip title={`Match Score: ${internship.matchScore}%`}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp
                      color={internship.matchScore >= 80 ? "success" :
                        internship.matchScore >= 60 ? "primary" : "action"}
                      sx={{ mr: 1 }}
                    />
                    <Typography
                      variant="subtitle2"
                      color={internship.matchScore >= 80 ? "success.main" :
                        internship.matchScore >= 60 ? "primary.main" : "text.secondary"}
                    >
                      {internship.matchScore}% Match
                    </Typography>
                  </Box>
                </Tooltip>
                <LinearProgress
                  variant="determinate"
                  value={internship.matchScore}
                  sx={{
                    width: '100px',
                    height: 8,
                    borderRadius: 4,
                    ml: 2,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: internship.matchScore >= 80 ? 'success.main' :
                        internship.matchScore >= 60 ? 'primary.main' : 'warning.main'
                    }
                  }}
                />
              </Box>

              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  height: '3em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {internship.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Business sx={{ mr: 1 }} color="action" />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary'
                  }}
                >
                  {internship.organization}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1 }} color="action" />
                <Typography variant="body2">
                  {internship.location}
                </Typography>
                {internship.locationMatch && (
                  <Tooltip title="Location Match">
                    <CheckCircle color="success" sx={{ ml: 1, fontSize: '1rem' }} />
                  </Tooltip>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School sx={{ mr: 1 }} color="action" />
                <Typography variant="body2">
                  {internship.requirements.join(', ')}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  mb: 1
                }}
              >
                Skills ({Math.round(internship.skillMatch)}% match):
              </Typography>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5,
                  minHeight: '48px'
                }}
              >
                {internship.skills.map((skill: string) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{
                      borderRadius: '4px',
                      backgroundColor: internship.matchedSkills.includes(skill) ? 'success.light' : 'transparent',
                      color: internship.matchedSkills.includes(skill) ? 'success.contrastText' : 'inherit',
                      '&:hover': {
                        backgroundColor: internship.matchedSkills.includes(skill) ? 'success.main' : 'secondary.main',
                        color: 'white'
                      }
                    }}
                    color={internship.matchedSkills.includes(skill) ? "success" : "secondary"}
                    variant={internship.matchedSkills.includes(skill) ? "filled" : "outlined"}
                  />
                ))}
              </Box>

              {/* Career Guidance Section */}
              {internship.careerGuidance && (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontStyle: 'italic',
                      backgroundColor: 'grey.50',
                      p: 1,
                      borderRadius: 1
                    }}
                  >
                    <InfoIcon sx={{ fontSize: '1rem', mr: 0.5, verticalAlign: 'middle' }} />
                    {internship.careerGuidance}
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<WorkOutline />}
                  onClick={() => onApply?.(internship)}
                >
                  Apply Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default InternshipResults;